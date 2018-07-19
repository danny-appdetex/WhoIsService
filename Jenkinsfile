pipeline {
  agent any

    environment {
      SLACK_CHANNEL = "#registrar-services"
    }

  stages {
    stage('Build') {
          steps {
              //Builds the Artifacts and creates the docker image and tag
              sh "mvn clean package -Dbuild.number=${BUILD_NUMBER}"
          }

          post {
              always{
                  junit 'server/target/surefire-reports/*.xml'
              }
            }
    }

    stage('Publish') {
          steps {

              //Deploys the artifacts to Archiva
              sh "mvn deploy -DskipTests"
              // this has to be deployed prior to running the maven stuff, since it tries to download the core library

              script {
                      env.REPO =  sh(returnStdout: true, script: "${JENKINS_HOME}/repo.sh").trim()
                      env.APP = sh(returnStdout: true, script: "${JENKINS_HOME}/app.sh").trim()
                      env.VERSION = sh(returnStdout: true, script: "${JENKINS_HOME}/maven_version.sh").trim()
              }

              //logs into aws docker repo
              sh('#!/bin/sh -e\n' + 'eval \$(aws ecr get-login --no-include-email)')

              echo "Docker Push for ${env.REPO}:${env.VERSION}-${BUILD_NUMBER}"
              //pushes docker image to aws docker repo
              sh "docker push ${env.REPO}:${env.VERSION}-${BUILD_NUMBER}"
              echo "Docker Pushed for ${env.REPO}:${env.VERSION}-${BUILD_NUMBER}"
          }
    }


  }
    post {
      always{
          echo 'Finished Now Deleting Docker image'
          sh "docker image rm ${env.REPO}:${env.VERSION}-${BUILD_NUMBER}"
      }
      success{
         slackSend channel:"${SLACK_CHANNEL}",
                   color: 'good',
                   message: "*Build Successful - ${env.JOB_NAME}* (<${env.BUILD_URL}|Open>)\nVersion - ${env.VERSION}\nTest - (<https://jenkistrar.appdetex.com/job/domain-ops-fargate-deploy/parambuild/?APP=${env.APP}&VERSION=${env.VERSION}&BUILD_JOB_NUMBER=${BUILD_NUMBER}&SERVICE=domain-ops-service-test| Deploy>)"
      }
      failure{
        slackSend channel:"${SLACK_CHANNEL}",
                           color: 'danger',
                           message: "*Build Failure - ${env.JOB_NAME}* (<${env.BUILD_URL}|Open>)\nVersion - ${env.VERSION}"
      }

   }
}
