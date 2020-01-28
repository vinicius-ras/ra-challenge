FROM openjdk:12-jdk
COPY target/ra-challenge.jar ra-challenge.jar
CMD ["java", "-jar", "ra-challenge.jar"]