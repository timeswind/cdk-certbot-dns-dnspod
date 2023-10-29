import * as cdk from 'aws-cdk-lib';
import * as assertions from 'aws-cdk-lib/assertions';
import * as events from 'aws-cdk-lib/aws-events';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { CertbotDnsDnspodJob } from '../src/index';
const devEnv = {
  account: '1234567890xx',
  region: 'ap-northeast-1',
};

const mock = {
  dnsDnspodApiId: 'XXXXXXXXXXXXX',
  dnsDnspodApiToken: 'XXXXXXXXXXXXX',
};

test('only create certbot lambda.', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
      },
    },
  });
  assertions.Template.fromStack(stack).findResources('AWS::IAM::Role');
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'logs:PutRetentionPolicy',
            'logs:DeleteRetentionPolicy',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
  });
});

test('create certbot lambda schedule rule.', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
    schedule: events.Schedule.cron({ month: '2' }),
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
      },
    },
  });
  assertions.Template.fromStack(stack).findResources('AWS::IAM::Role');
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: [
            'logs:PutRetentionPolicy',
            'logs:DeleteRetentionPolicy',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Events::Rule', {
    ScheduleExpression: 'cron(* * * 2 ? *)',
    State: 'ENABLED',
    Targets: [
      {
        Arn: {
          'Fn::GetAtt': [
            'TesttaskcertbotDnsDnspodJobLambdaBashExecFunction56719535',
            'Arn',
          ],
        },
        Id: 'Target0',
      },
    ],
  });
});

test('test right customPrefixDirectory.', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
      customPrefixDirectory: 'abc',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
    schedule: events.Schedule.cron({ month: '2' }),
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
        CUSTOM_PREFIX_DIRECTORY: 'abc',
      },
    },
  });
});

test('test right / path customPrefixDirectory.', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
      customPrefixDirectory: '/',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
    schedule: events.Schedule.cron({ month: '2' }),
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
        CUSTOM_PREFIX_DIRECTORY: '/',
      },
    },
  });
});

test('test define right Lambda Image Architecture x86_64', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
      customPrefixDirectory: '/',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
    schedule: events.Schedule.cron({ month: '2' }),
    architecture: lambda.Architecture.X86_64,
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Architectures: [
      'x86_64',
    ],
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
        CUSTOM_PREFIX_DIRECTORY: '/',
      },
    },
  });
});

test('test define right Lambda Image Architecture arm64', () => {
  const mockApp = new cdk.App();
  const stack = new cdk.Stack(mockApp, 'teststack', { env: devEnv });
  const bucket = new s3.Bucket(stack, 'testingBucket');

  new CertbotDnsDnspodJob(stack, 'Testtask', {
    certbotOptions: {
      domainName: 'example.com',
      email: 'user@example.com',
      customPrefixDirectory: '/',
    },
    dnsDnspodApiId: mock.dnsDnspodApiId,
    dnsDnspodApiToken: mock.dnsDnspodApiToken,
    destinationBucket: bucket,
    schedule: events.Schedule.cron({ month: '2' }),
    architecture: lambda.Architecture.ARM_64,
  });
  assertions.Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
    Architectures: [
      'arm64',
    ],
    Environment: {
      Variables: {
        BUCKET_NAME: {
          Ref: 'testingBucket9FA8E574',
        },
        EMAIL: 'user@example.com',
        DOMAIN_NAME: 'example.com',
        CUSTOM_PREFIX_DIRECTORY: '/',
      },
    },
  });
});