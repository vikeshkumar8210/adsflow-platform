pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT', 
            choices: ['STAGING', 'PRODUCTION'], 
            description: 'Select target deployment environment'
        )
        string(
            name: 'BUILD_NOTE', 
            defaultValue: 'DevSecOps Release Pipeline', 
            description: 'Short description for this release'
        )
    }

    tools {
        nodejs 'NodeJS-20'  
    }

    environment {
        PROJECT_NAME = 'adsflow-platform'
        GITHUB_PAT = credentials('github-access-token')
        IMAGE_TAG = "v1.0.${BUILD_NUMBER}"
    }

    stages {
        stage('1. Environment Setup & Information') {
            steps {
                echo " Target Environment: ${params.ENVIRONMENT}"
                echo " Build Note: ${params.BUILD_NOTE}"
                echo "Checking out source code from Git repository..."
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

        stage('5. DevSecOps: Trivy Repository Vulnerability Scan') {
            steps {
                echo 'Scanning source repository code for secrets & vulnerabilities using Trivy...'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:/root/aquasec aquasec/trivy:latest fs --severity HIGH,CRITICAL /root/aquasec || true'
            }
        }

        stage('6. Archive Build Artifacts') {
            steps {
                echo 'Archiving compiled distribution packages...'
                archiveArtifacts artifacts: 'frontend/dist/**', allowEmptyArchive: false
            }
        }
    }

    post {
        always {
            echo 'DevSecOps Pipeline Execution Completed.'
            cleanWs()
        }
        success {
            echo " AdsFlow Enterprise DevSecOps Pipeline Succeeded for ${params.ENVIRONMENT}!"
        }
        failure {
            echo " Pipeline Failed on ${params.ENVIRONMENT}. Please check logs."
        }
    }
}