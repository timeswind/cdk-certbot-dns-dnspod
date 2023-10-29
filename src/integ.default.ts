import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { CertbotDnsDnspodJob } from '.';

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

const stack = new cdk.Stack(app, 'lambda-certbot-dev', { env: devEnv });

new CertbotDnsDnspodJob(stack, 'Demo', {
  certbotOptions: {
    domainName: stack.node.tryGetContext('DOMAIN') ?? '*.example.com',
    email: stack.node.tryGetContext('EMAIL') ?? 'user@example.com',
    customPrefixDirectory: '/',
  },
  dnsDnspodApiId: stack.node.tryGetContext('DNS_DNSPOD_API_ID') ?? 'mockId',
  dnsDnspodApiToken: stack.node.tryGetContext('DNS_DNSPOD_API_TOKEN') ?? 'mockToken',
  destinationBucket: s3.Bucket.fromBucketName(stack, 'myBucket', stack.node.tryGetContext('BUCKETNAME') ?? 'mybucket'),
  architecture: lambda.Architecture.X86_64,
});

app.synth();