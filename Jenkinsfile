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
        sh 'sudo docker build -t nshah/jira-kube-log_${env.BUILD_NUMBER} .'
        // sh 'eval $(docker-machine env)'
        // sh 'docker build -t nshah/piglatin .'
        
        
    }

    stage('Update image registry')
    {
        // sh 'sudo docker login'
        sh 'sudo docker tag nshah/jira-kube-log 62.60.42.82:8123/nshah/jira-kube-log_${env.BUILD_NUMBER}'
        sh 'sudo docker push  62.60.42.82:8123/nshah/jira-kube-log_${env.BUILD_NUMBER}'
    }
}
node('deploy'){
    stage('Deploy'){

         echo 'Run docker image'
        //  sh 'sudo docker run -p 3003:3003 -d nshah/jira-kube-log'
         sh ' kubectl create -f web-pod.yml'
         sh ' kubectl create -f web-svc.yml'
         sh ' kubectl create -f web-rc.yml'
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