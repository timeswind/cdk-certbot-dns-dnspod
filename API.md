# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### BashExecFunction <a name="cdk-certbot-dns-dnspod.BashExecFunction"></a>

#### Initializers <a name="cdk-certbot-dns-dnspod.BashExecFunction.Initializer"></a>

```typescript
import { BashExecFunction } from 'cdk-certbot-dns-dnspod'

new BashExecFunction(scope: Construct, id: string, props: BashExecFunctionProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunction.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunction.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunction.parameter.props"></a>

- *Type:* [`cdk-certbot-dns-dnspod.BashExecFunctionProps`](#cdk-certbot-dns-dnspod.BashExecFunctionProps)

---



#### Properties <a name="Properties"></a>

##### `handler`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunction.property.handler"></a>

```typescript
public readonly handler: DockerImageFunction;
```

- *Type:* [`aws-cdk-lib.aws_lambda.DockerImageFunction`](#aws-cdk-lib.aws_lambda.DockerImageFunction)

---


### CertbotDnsDnspodJob <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJob"></a>

#### Initializers <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJob.Initializer"></a>

```typescript
import { CertbotDnsDnspodJob } from 'cdk-certbot-dns-dnspod'

new CertbotDnsDnspodJob(scope: Construct, id: string, props: CertbotDnsDnspodJobProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJob.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJob.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJob.parameter.props"></a>

- *Type:* [`cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps`](#cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps)

---





## Structs <a name="Structs"></a>

### BashExecFunctionProps <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BashExecFunctionProps } from 'cdk-certbot-dns-dnspod'

const bashExecFunctionProps: BashExecFunctionProps = { ... }
```

##### `script`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.script"></a>

```typescript
public readonly script: string;
```

- *Type:* `string`

The path of the shell script to be executed.

---

##### `architecture`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* [`aws-cdk-lib.aws_lambda.Architecture`](#aws-cdk-lib.aws_lambda.Architecture)
- *Default:* lambda.Architecture.X86_64

Custom lambda Image Architecture.

---

##### `dockerfile`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.dockerfile"></a>

```typescript
public readonly dockerfile: string;
```

- *Type:* `string`

The path of your custom dockerfile.

---

##### `environment`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Lambda environment variables.

---

##### `role`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* [`aws-cdk-lib.aws_iam.IRole`](#aws-cdk-lib.aws_iam.IRole)
- *Default:* auto generated role.

Custom lambda execution role.

---

##### `timeout`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.BashExecFunctionProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* [`aws-cdk-lib.Duration`](#aws-cdk-lib.Duration)
- *Default:* Duration.seconds(60)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value based on the function's expected execution time.

---

### CertbotDnsDnspodJobProps <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CertbotDnsDnspodJobProps } from 'cdk-certbot-dns-dnspod'

const certbotDnsDnspodJobProps: CertbotDnsDnspodJobProps = { ... }
```

##### `certbotOptions`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.certbotOptions"></a>

```typescript
public readonly certbotOptions: CertbotOptions;
```

- *Type:* [`cdk-certbot-dns-dnspod.CertbotOptions`](#cdk-certbot-dns-dnspod.CertbotOptions)

certbot cmd options.

---

##### `destinationBucket`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.destinationBucket"></a>

```typescript
public readonly destinationBucket: IBucket;
```

- *Type:* [`aws-cdk-lib.aws_s3.IBucket`](#aws-cdk-lib.aws_s3.IBucket)

The S3 bucket to store certificate.

---

##### `dnsDnspodApiId`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.dnsDnspodApiId"></a>

```typescript
public readonly dnsDnspodApiId: string;
```

- *Type:* `string`

The dnspod api id and token.

---

##### `dnsDnspodApiToken`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.dnsDnspodApiToken"></a>

```typescript
public readonly dnsDnspodApiToken: string;
```

- *Type:* `string`

---

##### `architecture`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* [`aws-cdk-lib.aws_lambda.Architecture`](#aws-cdk-lib.aws_lambda.Architecture)
- *Default:* lambda.Architecture.X86_64

Custom lambda Image Architecture.

---

##### `schedule`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.CertbotDnsDnspodJobProps.property.schedule"></a>

```typescript
public readonly schedule: Schedule;
```

- *Type:* [`aws-cdk-lib.aws_events.Schedule`](#aws-cdk-lib.aws_events.Schedule)
- *Default:* no shedule

run the Job with defined schedule.

---

### CertbotOptions <a name="cdk-certbot-dns-dnspod.CertbotOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CertbotOptions } from 'cdk-certbot-dns-dnspod'

const certbotOptions: CertbotOptions = { ... }
```

##### `domainName`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotOptions.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* `string`

the domain must host on route53 like example.com.

---

##### `email`<sup>Required</sup> <a name="cdk-certbot-dns-dnspod.CertbotOptions.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* `string`

Email address for important account notifications.

---

##### `customPrefixDirectory`<sup>Optional</sup> <a name="cdk-certbot-dns-dnspod.CertbotOptions.property.customPrefixDirectory"></a>

```typescript
public readonly customPrefixDirectory: string;
```

- *Type:* `string`
- *Default:* `s3://YOUR_BUCKET_NAME/2021-01-01/your.domain.name/`

Custom prefix directory on s3 bucket object path.

---



