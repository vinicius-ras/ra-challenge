FROM maven:3.6.3-jdk-13
WORKDIR /workspace/complaints
COPY . .
RUN mvn package -DskipTests
CMD wait-for-it.sh oidc-provider:5000 -- \
	java -jar target/ra-challenge.jar
