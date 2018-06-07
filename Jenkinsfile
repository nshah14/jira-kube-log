#!/usr/bin/env groovy
node('build') {
    stage( 'Intializing')
    {
        echo 'Intializing ...'
        sh 'echo $(whomai)'
        
    }

    stage('Checkout'){
       
       echo 'Getting source code'
       checkout scm
    
    }


    stage('Build Docker Image'){
        echo 'Building docker image'
        // sh 'sudo docker stop $(sudo docker ps -q)'
        // sh 'sudo docker rm $(sudo docker ps -a -q)'
        // sh 'sudo docker images -q -f dangling=true | sudo xargs --no-run-if-empty docker rmi'
        // sh 'sudo docker rmi $(sudo docker images -q -f dangling=true)'  
        // sh 'docker-machine env'
        sh 'sudo docker build -t nshah/jira-kube-log .'
        // sh 'eval $(docker-machine env)'
        // sh 'docker build -t nshah/piglatin .'
        
        
    }

    stage('Update image registry')
    {
        // sh 'sudo docker login'
        //docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
        sh 'sudo docker tag nshah/jira-kube-log:latest 62.60.42.82:8123/nshah/jira-kube-log:${BUILD_NUMBER}'
        sh 'sudo docker push  62.60.42.82:8123/nshah/jira-kube-log:${BUILD_NUMBER}'
        sh 'sudo docker push  62.60.42.82:8123/nshah/jira-kube-log:latest'
    }
}
node('deploy'){
    stage('Checkout'){
       
       echo 'Getting source code'
       checkout scm
    
    }

    stage('Deploy'){

         echo 'Run docker image'
        //  sh 'sudo docker run -p 3003:3003 -d nshah/jira-kube-log'
        //  sh 'kubectl edit configmap special-config --from-literal=BUILD_NUMBER=${BUILD_NUMBER} '
         sh '''
            msg=$(kubectl describe rc  2>&1)
            if [ "$msg" = ""]; 
                then
                    echo 'no pod existing'
                else
                    kubectl delete -f webtime-rc.yml
                    kubectl delete -f webtime-svc.yml
            fi
         '''

        //  sh ' msg=$(kubectl delete -f webtime-rc.yml 2>&1)'
        //  sh ' echo $msg'
        //  sh ' kubectl delete -f webtime-svc.yml'
         sh ' kubectl create -f webtime-pod.yml '
         sh ' kubectl create -f webtime-svc.yml '
         sh ' kubectl create -f webtime-rc.yml'
    }


    stage('Cleanup'){

         echo 'cleanup data'
        
        //  mail body: 'project build successful',
        //              from: 'xxxx@yyyyy.com',
        //              replyTo: 'xxxx@yyyy.com',
        //              subject: 'project build successful',
        //              to: 'yyyyy@yyyy.com'
    }


    stage('Test'){

        //  env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"
          /** for running the jasmine test.
            jasmine
          */

    }
}