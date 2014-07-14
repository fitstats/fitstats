angular.module('fitStatsApp')

.factory('FormFunctions', function($filter){
  var submit = function(formData, field, decimals) {
    var data = $filter("number")(formData, decimals);
    this.today.$child(field).$set(data);    // ∆ error $child
    this.inputMode = false;
  };

  //for some reason this doesn't work
  var edit = function(){
    this.inputMode = true;
  };

  return {
    test: 10,
    submit: submit,
    edit: edit
  };
});

// angular.module('fitStatsApp')
//
// .factory('userFb', function($rootScope, $firebase, $q) {
//   return {
//     user: null,
//     promiseToHaveUser: function() {
//       var deferred = $q.defer();
//
//       if (this.user === null) {
//         this.user = $firebase(new Firebase('https://fitstats.firebaseio.com/users/' + 'simplelogin:1'));
//         this.user.$on('loaded', function(loadedData) {
//           deferred.resolve();
//         });
//       }
//       else {
//         deferred.resolve();
//       }
//
//       return deferred.promise;
//     }
//   };
// });
