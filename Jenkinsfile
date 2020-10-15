properties(
    [
        [$class: 'BuildDiscarderProperty', strategy:
          [$class: 'LogRotator', artifactDaysToKeepStr: '14', artifactNumToKeepStr: '5', daysToKeepStr: '30', numToKeepStr: '60']],
        pipelineTriggers(
          [
              pollSCM('H/15 * * * *'),
              cron('@daily'),
          ]
        )
    ]
)

node {
    stage('Checkout') {
        deleteDir()
        checkout scm
    }

    stage('NPM Install') {
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            sh 'npm install'
        }
    }

    stage('Test') {
        sh 'ng test --browsers ChromeHeadless --progress=false --watch false --code-coverage'
    }

    stage('Lint') {
        sh 'ng lint'
    }

    stage('Static Code Analysis') {
      steps{
        withSonarQubeEnv('Sonar') {
			sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.cliente:Ceiba-AdnADIGamerFront(alejandro.diez) -Dsonar.projectName=Ceiba-AdnADIGamerFront(alejandro.diez) -Dproject.settings=./sonar-project.properties"
        }
      }
    }

    stage('Build') {
        milestone()
        sh 'ng build --prod --progress=false'
    }
}