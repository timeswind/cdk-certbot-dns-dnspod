FROM public.ecr.aws/lambda/provided:al2

RUN yum install python3-pip -y && pip3 install zope certbot-dns-dnspod awscli

COPY bootstrap /var/runtime/bootstrap
COPY function.sh /var/task/function.sh
COPY main.sh /var/task/main.sh
RUN chmod +x /var/runtime/bootstrap /var/task/function.sh /var/task/main.sh

WORKDIR /var/task
CMD [ "function.sh.handler" ]
