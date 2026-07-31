pipeline {
    agent any

    environment {
        PROJECT_NAME = 'adsflow-platform'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('2. Backend Verification & Build') {
            steps {
                dir('backend') {
                    echo 'Installing Backend dependencies & running TypeScript compilation check...'
                    sh 'npm ci'
                    sh 'npx prisma generate'
                    sh 'npm run build'
                }
            }
        }

        stage('3. Frontend Verification & Build') {
            steps {
                dir('frontend') {
                    echo 'Installing Frontend dependencies & verifying build bundle...'
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('4. Docker Container Orchestration Test') {
            steps {
                echo 'Validating Docker Compose build configuration...'
                sh 'docker compose config'
                sh 'docker compose build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline Execution Completed.'
            cleanWs()
        }
        success {
            echo '✅ AdsFlow CI/CD Pipeline Executed Successfully!'
        }
        failure {
            echo '❌ Pipeline Failed. Please check build logs.'
        }
    }
}