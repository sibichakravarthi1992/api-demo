var app=new function()
{
    var url ="https://localhost:5001/api/demo";
    demo =[];
    this.FetchAll = function()
    {
        alert();
        //var
        fetch(url).then((response) => 
        {

            demo = response.json();
            // console.log(user);
            return demo;

        }).then((demo) =>
         {
           // console.log(demo);
            var html = "<table border='1|1'>";
            html += "<th>ID</th>";
            html += "<th>Name </th>";
            html += "<th>Email Id</th>";
           
            for (var i = 0; i < demo.length; i++) 
            {
                html+="<tr>";
                html+="<td>"+demo[i].id + "</td>";
                html+="<td>"+demo[i].name+ "</td>";
                html+="<td>"+demo[i].emailId+"</td>";
                html+='<td><button onclick="app.edit(' + demo[i].id + ')">Edit</button></td>';
                html+='<td><button onclick="app.del(' + demo[i].id + ')">Delete</button></td>';
                html+="</tr>";
            }
            html += "</table>";
            document.getElementById("box").innerHTML = html;
        });  
    }
       // saveAndUpdate
    this.saveAndUpdate = function () {
        alert();
        ((document.getElementById('myBtn').innerHTML == "Save") ? this.add() : this.update());
    }
        
    this.add = function (){
      
        var id =0;
       // var id = document.getElementById("name").value;
        var name = document.getElementById("name").value;
        var emailId= document.getElementById("emailId").value;
        
        //alert(id);
        //alert(name);
        
        //alert(emailId);
       
        demoobj={};
        demoobj.id=id;
        demoobj.name=name;
        demoobj.emailId=emailId;
     
      
        console.log(JSON.stringify(demoobj));
        fetch(url,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(demoobj)
        })
            .then((response) => 
            {
                this.FetchAll();
                document.getElementById('id').value = '';     
                document.getElementById('name').value = '';  
                document.getElementById('emailId').value = ''; 
                                 
            });
    
         this.edit = function (id)
          {
        alert();
        document.getElementById('myBtn').innerHTML = "update";
        
        fetch(url +"/"+ id, { method: 'GET' })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (names) 
            {
                alert(JSON.stringify(names));
                updateindex = names.id;
                document.getElementById('id').value = names.id;      
                document.getElementById('name').value =  names.name;  
                document.getElementById('emailId').value =  names.emailId; 
                
            })
           this.update=function(){
            id = parseInt(document.getElementById('id').value);
            name = document.getElementById('name').value;
            emailId =  document.getElementById('emailId').value ;
         
            // el1=document.getElementById('id');
            var updateobj = JSON.stringify({ "id": id,"name": name,"emailId":emailId});
            fetch(url+"/"+updateindex, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                },
    
                body: updateobj
                 })
                .then((response) => {
    
                    this.FetchAll();
                    document.getElementById('id').value = '';
                    document.getElementById('name').value = '';
                    document.getElementById('emailId').value = '';       
                });
            updateindex = 0;
            document.getElementById('myBtn').innerHTML = "Save";
        }

 }
   
    }// delete
    this.del = function (deleteid) {
        alert(deleteid);
        // url = "https://localhost:5001/api/demo/" + deleteid;
        fetch(url+"/"+deleteid, {
            method: 'delete',
            // mode: 'cors',
            // redirect: 'follow'
        }).then((response) => {

            this.FetchAll();
        });
    }

}