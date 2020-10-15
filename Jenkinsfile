node {
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout([
			$class: 'GitSCM',
			branches: [[name: '*/master']],
			doGenerateSubmoduleConfigurations: false,
			extensions: [],
			gitTool: 'Default',
			submoduleCfg: [],
			userRemoteConfigs: [[
				credentialsId: 'GitHub_rquirpa-csh',
				url:'https://github.com/alejandro-diez-ceiba/adn-front.git'
			]]
		])
      }
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
          container('SonarQubeScanner') {
            withSonarQubeEnv('SonarQube') {
                sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
            }
        }
      }
    }

    stage('Build') {
        milestone()
        sh 'ng build --prod --progress=false'
    }

    post {
        success {
        echo 'This will run only if successful'
        }
        failure {
        echo 'This will run only if failed'
        mail (to: 'alejandro.diez@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
        }
  }
}