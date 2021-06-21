*** run the following command  for development ***

-> openssl genrsa -out key.pem

-> penssl req -new -key key.pem -out csr.pem

-> openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem