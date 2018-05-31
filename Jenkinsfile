node('testing') {
    stage( 'Intializing')
    {
        echo 'Intializing ...'
        sh 'echo $(whomai)'
        
    }

    stage('Checkout'){
       
       echo 'Getting source code'
       checkout scm
    
    }

    // stage('Install Docker'){
    //     echo 'Building docker image'
    //     sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -'
    //     sh 'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
    //     sh 'sudo apt-get update'
    //     sh 'apt-cache policy docker-ce'
    //     sh 'sudo apt-get install -y docker-ce'
    //     sh 'sudo systemctl status docker'
    //        /**
               
    //            docker-machine env
    //            docker build -t nshah/piglatin .
    //            eval $(docker-machine env)
    //            docker build -t nshah/piglatin .
               
    //        */ 
    // }
    stage('Install Docker on Centos node'){
        echo 'Building docker image'
        // sh 'sudo yum install docker'
        // sh 'sudo yum remove docker docker-common docker-selinux docker-engine'
        // sh 'sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo'
        // sh 'sudo yum install docker-ce'
           /**
               
               docker-machine env
               docker build -t nshah/piglatin .
               eval $(docker-machine env)
               docker build -t nshah/piglatin .
               
           */ 
    }

    stage('Build Docker'){
        echo 'Building docker image'
        // sh 'sudo docker stop $(sudo docker ps -q)'
        // sh 'sudo docker rm $(sudo docker ps -a -q)'
        sh 'sudo docker images -q -f dangling=true | sudo xargs --no-run-if-empty docker rmi'
        // sh 'sudo docker rmi $(sudo docker images -q -f dangling=true)'  
        // sh 'docker-machine env'
        sh 'sudo docker build -t nshah/jira-kube-log .'
        // sh 'eval $(docker-machine env)'
        // sh 'docker build -t nshah/piglatin .'
        
        
    }

    stage('Update image registry')
    {
        // sh 'sudo docker login'
        sh 'sudo docker tag nshah/jira-kube-log 62.60.42.82:8213/nshah/jira-kube-log'
        sh 'sudo docker push  62.60.42.82:8213/nshah/jira-kube-log'
    }

    stage('Deploy'){

         echo 'Run docker image'
         sh 'sudo docker run -p 3003:3003 -d nshah/jira-kube-log'
         

    }


    // stage('Cleanup'){

    //      echo 'cleanup data'
        
    //     //  mail body: 'project build successful',
    //     //              from: 'xxxx@yyyyy.com',
    //     //              replyTo: 'xxxx@yyyy.com',
    //     //              subject: 'project build successful',
    //     //              to: 'yyyyy@yyyy.com'
    // }


    // stage('Test'){

    //     //  env.NODE_ENV = "test"

    //      print "Environment will be : ${env.NODE_ENV}"
    //       /** for running the jasmine test.
    //         jasmine
    //       */

    // }
}