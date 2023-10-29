#!/bin/bash
DOMAIN_NAME=$DOMAIN_NAME
MAIL=$EMAIL

echo "start to renew cert from dnspod"

if [ -z "$DNS_DNSPOD_API_ID" ]; then
    echo "DNS_DNSPOD_API_ID is not set"
    exit 1
elif [ -z "$DNS_DNSPOD_API_TOKEN"]; then
    echo "DNS_DNSPOD_API_TOKEN is not set"
    exit 1
fi    

# create credentials.ini in /tmp directory
echo "dns_dnspod_api_id = $DNS_DNSPOD_API_ID" > /tmp/credentials.ini
echo "dns_dnspod_api_token = $DNS_DNSPOD_API_TOKEN" >> /tmp/credentials.ini

certbot certonly --agree-tos \
--dns-dnspod \
--dns-dnspod-credentials /tmp/credentials.ini \
--dns-dnspod-propagation-seconds 30 \
-d ${DOMAIN_NAME} -m ${MAIL} --no-eff-email --config-dir /tmp --work-dir /tmp --logs-dir /tmp
sleep 30
TODAY=$(date +"%Y-%m-%d")

if [ -z "$CUSTOM_PREFIX_DIRECTORY" ]; then
    echo "CUSTOM_PREFIX_DIRECTORY is not set"
    echo "S3_PATH is set to \$TODAY"
    export S3_PATH="${TODAY}/"
elif [ $CUSTOM_PREFIX_DIRECTORY == "/" ]; then
    echo "S3_PATH is set to /"
    export S3_PATH=""
else
    echo "S3_PATH CUSTOM_PREFIX_DIRECTORY is set"
    export S3_PATH="${CUSTOM_PREFIX_DIRECTORY}/"
fi


echo "sync file to S3 bucket s3://${BUCKET_NAME}/${S3_PATH}"
aws s3 sync /tmp/live/ s3://${BUCKET_NAME}/${S3_PATH}
