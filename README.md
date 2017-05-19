# markdowntohtml

## AWS Lambda Package for Markdown to HTML

- Clone the Git Repo
- Run npm install
- Change the output Bucket Name to the bucket where you want the html files to be uploaded in the index.js file
- Save changes made to index.js
- Upload the archive file (containing the index.js, node_modules and package.json) to AWS Lambda via File Upload option with run time as `Node JS`
- Configure Event Sources on your input Bucket to listen for PutObjects

