var app = angular.module('blogApp',['ui.router']);

app.config(['$stateProvider',function($stateProvider){
  $stateProvider
    // .state('addBlog',{
    //   url:'/add-blog',
    //   templateUrl:'AddBlog.html',
    //   controller:'addBlog'
    // })
    .state('blogFood',{
      url:'/blog/food',
      templateUrl:'msg1.html',
      controller:'blogFood'
    })
    .state('blogHealth',{
      url:'/blog/health',
      templateUrl:'msg1.html',
      controller:'blogHealth'
    })
    .state('blogEducation',{
      url:'/blog/education',
      templateUrl:'msg1.html',
      controller:'blogEducation'
    })
    .state('blogpersonelexperience',{
      url:'/blog/personelexperience',
      templateUrl:'msg1.html',
      controller:'blogpersonelexperience'
    })
    .state('blogmisc',{
      url:'/blog/misc',
      templateUrl:'msg1.html',
      controller:'blogmisc'
    })
    .state('titleClicked',{
      url:'/title-clicked/{id:[0-9]+}',
      templateUrl:'blogDescription.html',
      controller:'blogDescription'
    })
    .state('nopath',{
      url:'*path',
      templateUrl:'addblog.html',
      controller:'addBlog'
    });
}]);

//service

// app.service('linkHandler',);

app.controller('addBlog',['$scope','$http',function($scope,$http){
  $scope.title='';
  $scope.categoryNames=['food','health','education','personel experience','miscellaneous'];
  $scope.category=$scope.categoryNames[0];
  $scope.description='';
  $scope.isPosted = false;

  $scope.doPost = function(){
    console.log("category = "+$scope.category);
      var d = new Date()
      var n = d.toISOString();
      var k = n.replace("Z","");
      console.log("Date is "+k);
      // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      // var message = {
      //   'title':$scope.title,
      //   'category':$scope.category,
      //   'description':$scope.description,
      //   'date': k
      // };


      $http({
        method:"POST",
        url:"http://localhost:8000",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data:'category='+$scope.category+'&title='+$scope.title+'&description='+$scope.description+'&date='+k
      }).then(function(response){
          console.log('Blog posted...');
          $scope.title='';
          $scope.category = '';
          $scope.description='';
          $scope.isPosted = true;

      },function(error){
        console.log("Error "+error);
      });    
  };

}]);

app.controller('blogHealth',['$scope','$http',function($scope,$http){

    $http({
      method:"GET",
      url: "http://localhost:8000/blog/health"
    }).then(function(response){

        console.log(response);
        $scope.response = response;
    });

}]);

app.controller('blogFood',['$scope','$http',function($scope,$http){
  $http({
    method : "GET",
    url : "http://localhost:8000/blog/food"
  }).then(function(response){
      console.log(response);
      $scope.response = response;
  });




}]);

app.controller('blogEducation',['$scope','$http',function($scope,$http){

    $http({
      method:"GET",
      url: "http://localhost:8000/blog/education"
    }).then(function(response){

        console.log(response);
        $scope.response = response;
    });

}]);
app.controller('blogpersonelexperience',['$scope','$http',function($scope,$http){

    $http({
      method:"GET",
      url: "http://localhost:8000/blog/personelexperience"
    }).then(function(response){

        console.log(response);
        $scope.response = response;
    });

}]);

app.controller('blogmisc',['$scope','$http',function($scope,$http){

    $http({
      method:"GET",
      url: "http://localhost:8000/blog/misc"
    }).then(function(response){

        console.log(response);
        $scope.response = response;
    });

}]);


app.controller('blogDescription',['$scope','$http','$stateParams',function($scope,$http,$stateParams){

  $http({
    method:"GET",
    url : "http://localhost:8000/"+$stateParams.id
  }).then(function(response){
    //console.log("hello");
    console.log(response.data);
    $scope.category = response.data.category;
    $scope.title=  response.data.title;
    $scope.description = response.data.description;
    $scope.date = response.data.date;
    $scope.id = response.data.id;
    $scope.likes = response.data.likes;
    $scope.unlikes = response.data.unlikes;

    $scope.url = '../images/'+$scope.category+'.jpg';
  });

  $scope.liked = function(){
    $http({
      method:"PUT",
      url:"http://localhost:8000/like/"+$stateParams.id
    }).then(function(response){
      console.log(response);
      $scope.likes = response.data;
    });
    $scope.clicked = true;
     
  };
  $scope.unliked = function(){
    $http({
      method:"PUT",
      url:"http://localhost:8000/unlike/"+$stateParams.id
    }).then(function(response){
      console.log(response);
      $scope.unlikes = response.data;
    });
    $scope.clicked = true;

  };

  //console.log("hello");
}]);
