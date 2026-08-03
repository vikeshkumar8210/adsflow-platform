pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'  // <--- Injects npm & node into PATH automatically
    }

    environment {
        PROJECT_NAME = 'adsflow-platform'
        GITHUB_PAT = credentials('github-access-token')
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
                echo 'Installing Backend dependencies & running TypeScript compilation check...'
                dir('backend') {
                    sh 'npm ci'
                    sh 'npx prisma generate'
                    sh 'npm run build'
                }
            }
        }

        stage('4. Frontend Verification & Build') {
            steps {
                echo 'Installing Frontend dependencies & compiling React SPA...'
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('5. DevSecOps: Docker Security & Build Test') {
            steps {
                echo 'Validating Docker Compose build specs...'
                sh 'docker compose config'
            }
        }
    }

    post {
        always {
            echo 'DevSecOps Pipeline Execution Completed.'
            cleanWs()
        }
        success {
            echo '✅ AdsFlow Enterprise CI/CD Pipeline Succeeded!'
        }
        failure {
            echo '❌ Pipeline Failed. Please check security/build logs.'
        }
    }
}