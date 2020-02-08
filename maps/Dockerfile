FROM maven:3.6.3-jdk-13
WORKDIR /workspace/complaints
COPY . .
COPY wait-for-it.sh /bin/wait-for-it.sh
RUN mvn package -DskipTests && chmod a+x /bin/wait-for-it.sh
CMD wait-for-it.sh oidc-provider:5000 -- \
	java -jar target/ra-challenge-maps.jar
