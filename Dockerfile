FROM ubuntu

RUN apt-get update \
    && apt-get install -y wget

RUN wget -q https://s3.amazonaws.com/appdetex-static-downloads-xxyyx/jdk-8u161-linux-x64.tar.gz \
    && mkdir /opt/jdk \
    && tar -xzf jdk-8u161-linux-x64.tar.gz -C /opt/jdk \
    && update-alternatives --install /usr/bin/java java /opt/jdk/jdk1.8.0_161/bin/java 100 \
    && update-alternatives --install /usr/bin/javac javac /opt/jdk/jdk1.8.0_161/bin/javac 100

VOLUME /tmp
ARG JAR_FILE
ADD target/${JAR_FILE} app.jar
ENV JAVA_OPTS="-Xms1000m -Xmx1700m -XX:+UseG1GC -Djava.security.egd=file:/dev/./urandom"
ENTRYPOINT exec java $JAVA_OPTS -jar /app.jar