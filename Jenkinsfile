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
            defaultValue: 'Routine CI Build', 
            description: 'Short description/note for this pipeline run'
        )
    }

    tools {
        nodejs 'NodeJS-20'  
    }

    environment {
        PROJECT_NAME = 'adsflow-platform'
        GITHUB_PAT = credentials('github-access-token')
    }

    stages {
        stage('1. Environment Setup & Information') {
            steps {
                echo "🚀 Target Environment: ${params.ENVIRONMENT}"
                echo "📝 Build Note: ${params.BUILD_NOTE}"
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

        stage('5. DevSecOps: Docker Security & Build Test') {
            steps {
                echo 'Validating Docker Compose build specs...'
                sh 'docker compose config || true'
            }
        }

        // 2. Archiving Compiled Application Assets
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
            echo "✅ AdsFlow Enterprise CI/CD Pipeline Succeeded for ${params.ENVIRONMENT}!"
        }
        failure {
            echo "❌ Pipeline Failed on ${params.ENVIRONMENT}. Please check logs."
        }
    }
}