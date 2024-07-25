
<script context="module" lang="ts">

  //import necessary functions
  import { isCareerEmpty, createCareer } from '../API/careers.svelte';
  import { isRolEmpty, createRol } from '../API/rols.svelte';

  import { isUserEmpty } from '../API/user.svelte';
  import { signUp } from '../API/auth.svelte';

  export async function default_values_to_db_function() {

    if(await isCareerEmpty()){

      console.log('Careers are empty, creating data');

      let default_careers = [

        {name: 'ING.SIST.COMP.'},
        {name: 'ING. EN LOGISTICA'},
        {name: 'ING. ELECTROM.'},
        {name: 'ING.IND.'},
        {name: 'ING. BIOQUIMICA'},
        {name: 'ING. MECANICA'},
        {name: 'ING. CIVIL'},
        {name: 'LIC. EN ADMON.'},

      ];

      for(let i = 0; i < default_careers.length; i++){
        await createCareer(default_careers[i]);
        // console.log('Career created: ', default_careers[i]);
      }

      console.log('Careers created');

    }else{
      console.log('Careers are not empty');
    }


    if(await isRolEmpty()){

      console.log('Rols are empty, creating data');

      let default_rols = [
        {name: 'Administrador'},
        {name: 'Usuario'},
      ];

      for(let i = 0; i < default_rols.length; i++){
        await createRol(default_rols[i]);
        // console.log('Rol created: ', default_rols[i]);
      }

      console.log('Rols created');


    }else{

      console.log('Rols are not empty');

    }

    if(await isUserEmpty()){

      console.log('Users are empty, creating data');

      //generate random password

      let data =
        {
          firstName: 'Admin',
          middleName: 'a',
          lastName: 'a',
          careerID: 1,
          rolID: 1,
          email: "admin@admin.tec",
          password: "admin"
        }



      const response = await signUp(data.email, data.password, data.firstName, data.middleName, data.lastName, data.careerID);




      }else{

      console.log('Users are not empty');

      }



  }

</script>
