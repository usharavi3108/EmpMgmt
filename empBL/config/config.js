console.log("within config file");
module.exports = {
      
    aws_table_name: "Tab_Proemp",
    aws_local_config: {
      region:"local",
      endpoint:"http://localhost:8000"
    },
    aws_remote_config: {
         }
  };