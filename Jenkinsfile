pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // must match the name you set in Jenkins Tools
    }

    environment {
        SONAR_TOKEN = credentials('sonar-token')  // credential ID you saved earlier
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --coverage'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {  // must match name in Jenkins System config
                    sh '''
                        sonar-scanner \
                          -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed — check test or quality gate results.'
        }
        success {
            echo 'All stages passed!'
        }
    }
}
