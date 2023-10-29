const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Neil Kuan',
  authorAddress: 'guan840912@gmail.com',
  cdkVersion: '2.12.0',
  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  name: 'cdk-certbot-dns-dnspod',
  repositoryUrl: 'https://github.com/timeswind/cdk-certbot-dns-dnspod.git',
  description: 'Create Cron Job Via Lambda, to update certificate using DNSPod verifaction and put it to S3 Bucket.',
  keywords: ['aws', 'cdk', 'certbot'],
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['timeswind'],
  },
  gitignore: [
    'cdk.context.json',
    'yarn-error.log',
    'cdk.out',
  ],
  npmignore: [
    'cdk.context.json',
    'yarn-error.log',
    'cdk.out',
    'images',
  ],
  workflowNodeVersion: '^16.20.0',
  typescriptVersion: '^4.9',
});
project.synth();
