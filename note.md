be sure to be inside the project directory then run these commands

0- make sure your curnet working directory is your project directory
1- docker build -t harbor.mr-elamin.com/bss/bss-connect:latest .
2- docker push harbor.mr-elamin.com/bss/bss-connect:latest 
3- kubectl get pod
4- kubectl delete pod bss-connect-deployment-84546d9755-4rb66 


docker image rmi <id>
docker image ls



kubectl apply -f <manifist-name.yaml>
kubectl get deployment
kubectl get rs
kubectl get pod