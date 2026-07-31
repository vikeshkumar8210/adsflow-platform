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

        stage('2. DevSecOps: NPM Dependency Audit') {
            steps {
                echo 'Running NPM Security Audit on Backend & Frontend...'
                dir('backend') {
                    sh 'npm audit --audit-level=high || true'
                }
                dir('frontend') {
                    sh 'npm audit --audit-level=high || true'
                }
            }
        }

        stage('3. Backend Verification & Build') {
            steps {
                dir('backend') {
                    echo 'Installing Backend dependencies & running TypeScript compilation check...'
                    sh 'npm ci'
                    sh 'npx prisma generate'
                    sh 'npm run build'
                }
            }
        }

        stage('4. Frontend Verification & Build') {
            steps {
                dir('frontend') {
                    echo 'Installing Frontend dependencies & verifying build bundle...'
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('5. DevSecOps: Docker Security & Build Test') {
            steps {
                echo 'Validating Docker Compose build configuration...'
                sh 'docker compose config'
                sh 'docker compose build'
            }
        }
    }

    post {
        always {
            echo 'DevSecOps Pipeline Execution Completed.'
            cleanWs()
        }
        success {
            echo '✅ AdsFlow DevSecOps Pipeline Executed Successfully!'
        }
        failure {
            echo '❌ Pipeline Failed. Please check security/build logs.'
        }
    }
}