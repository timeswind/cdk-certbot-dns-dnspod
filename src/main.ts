import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as target from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { BashExecFunction } from './lambda-bash';

export interface CertbotOptions {
  /**
   * the domain must host on dnspod like example.com.
   *
   * @example - `*.example.com` or `a.example.com` .
   */
  readonly domainName: string;

  /**
   * Email address associate with DNSPod account and for important account notifications.
   */
  readonly email: string;

  /**
   * Custom prefix directory on s3 bucket object path.
   * @default - `s3://YOUR_BUCKET_NAME/2021-01-01/your.domain.name/`
   *
   * @example - customPrefixDirectory: '/' -> `s3://YOUR_BUCKET_NAME/your.domain.name/`
   *
   * @example - customPrefixDirectory: 'abc' -> `s3://YOUR_BUCKET_NAME/abc/your.domain.name/`
   */
  readonly customPrefixDirectory?: string;
}

export interface CertbotDnsDnspodJobProps {
  /**
   * run the Job with defined schedule
   * @default - no shedule
   */
  readonly schedule?: events.Schedule;

  /**
   * The S3 bucket to store certificate.
   */
  readonly destinationBucket: s3.IBucket;

  /**
   * The dnspod api id and token.
   */
  readonly dnsDnspodApiId: string;
  readonly dnsDnspodApiToken: string;

  /**
   * certbot cmd options.
   */
  readonly certbotOptions: CertbotOptions;

  /**
   * Custom lambda Image Architecture.
   *
   * @default - lambda.Architecture.X86_64
   */
  readonly architecture?: lambda.Architecture;
}

export class CertbotDnsDnspodJob extends Construct {
  constructor(scope: Construct, id: string, props: CertbotDnsDnspodJobProps) {
    super(scope, id);
    const certOptions = {
      BUCKET_NAME: props.destinationBucket.bucketName,
      EMAIL: props.certbotOptions.email,
      DOMAIN_NAME: props.certbotOptions.domainName,
      CUSTOM_PREFIX_DIRECTORY: props.certbotOptions.customPrefixDirectory!,
      DNS_DNSPOD_API_ID: props.dnsDnspodApiId,
      DNS_DNSPOD_API_TOKEN: props.dnsDnspodApiToken,
    };

    const lambdaFun = new BashExecFunction(this, 'certbotDnsDnspodJobLambda', {
      script: path.join(__dirname, '../docker.d/entrypoint.sh'),
      timeout: cdk.Duration.minutes(5),
      architecture: props.architecture ?? lambda.Architecture.X86_64,
      environment: {
        ...certOptions,
      },
    });

    props.destinationBucket.grantReadWrite(lambdaFun.handler.role!);

    if (props.schedule) {
      new events.Rule(this, 'ScheduleRule', {
        schedule: props.schedule,
        targets: [
          new target.LambdaFunction(lambdaFun.handler),
        ],
      });
    }
  }
}