#!/usr/bin/env groovy
pipeline{
    agent any
    stages{
        stage( 'Intializing')
        { steps{

            echo 'Intializing ...'
            sh 'echo $(whomai)'
        }
        }

        stage('Checkout'){
         steps{
            echo 'Getting source code'
            checkout scm
         }
        }
        stage('Deploy to Kubernetes')
        { steps{
            kubernetesDeploy configs: '*.yml', kubeConfig: [path: ''], kubeconfigId: 'c4811480-91b8-481b-87ec-97d81abef669', secretName: 'regcred', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
        }}
    }
}
