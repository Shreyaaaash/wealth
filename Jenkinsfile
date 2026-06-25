pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-dockerhub-username/your-app"
        IMAGE_TAG  = "${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = credentials('dockerhub-creds')
    }

    tools {
        nodejs 'NodeJS-20'   // must match name in Global Tool Config
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "Branch: ${env.BRANCH_NAME} | Build: ${env.BUILD_NUMBER}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit '**/test-results/*.xml'   // if you output JUnit XML
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        def image = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        image.push()
                        image.push('latest')  // also tag as latest
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                        kubectl set image deployment/your-app \
                            your-app=${IMAGE_NAME}:${IMAGE_TAG} \
                            --namespace=production
                        kubectl rollout status deployment/your-app \
                            --namespace=production \
                            --timeout=120s
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful — image: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Pipeline failed — check logs above"
            // add email/Slack notification here
        }
    }
}
