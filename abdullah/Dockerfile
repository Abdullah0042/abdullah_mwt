FROM eclipse-temurin:21-jdk-alpine
EXPOSE 8080
CMD ["mvnw", "install"]

ADD target/abdullah-0.0.1.jar abdullah-0.0.1.jar
ENTRYPOINT ["java","-jar","/abdullah-0.0.1.jar"]