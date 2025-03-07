pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = credentials('dockerhub-username') 
        DOCKERHUB_PASSWORD = credentials('dockerhub-password') 
        EC2_SSH_KEY = credentials('ec2-ssh-key') 
        EC2_HOST = '54.167.229.193' 
        APP_NAME = 'nestjsapp'
        DATABASE_URL = 'postgresql://neondb_owner:VaqjIH0ymKk2@ep-calm-bonus-a1iom3yl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                script {
                    env.COMMIT_HASH = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    echo "env.COMMIT_HASH ${env.COMMIT_HASH}"
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} << EOF
                        # Install Docker if not installed
                        if ! command -v docker &> /dev/null
                        then
                            sudo apt update
                            sudo apt install -y docker.io
                            sudo systemctl start docker
                            sudo systemctl enable docker
                        fi

                        # Docker login
                        sh '''
                            echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
                        '''

                        # Pull the latest image
                        sudo docker pull ${DOCKERHUB_USERNAME}/${APP_NAME}:${COMMIT_HASH}

                        # Stop and remove the old container
                        sudo docker stop ${APP_NAME} || true
                        sudo docker rm ${APP_NAME} || true

                        # Run the new container
                        sudo docker run -d --name ${APP_NAME} -p 80:3000 -e DATABASE_URL="${DATABASE_URL}" ${DOCKERHUB_USERNAME}/${APP_NAME}:${COMMIT_HASH}

                        # Prune unused images
                        sudo docker image prune -af
                    EOF
                    """
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
