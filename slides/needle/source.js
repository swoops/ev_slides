    function doit(){
      let name = prompt("Insert username:");
      if (!name) return;
      name = btoa(name);
      let url = new URL(location.href);
      let param = 'name';
      if ( url.searchParams.has(param) )
        url.searchParams.set(param, name);
      else
        url.searchParams.append(param, name);
      location = url;
    }
    document.getElementById('execute').onclick = doit;

    function xss(){
      function rand(max){
        let num = Math.floor(Math.random()*1000);
        return num % max;
      }
      function getRandText(){
        // 0x30 to 0x7d
        let str = ""
        for (let i=0; i<rand(100)+10; i++){
          let c = rand(77) + 0x30
          str += String.fromCharCode(c);
        }
        return str;
      }

      function getParam(){
        let param = "name";
        let url = new URL(location.href);
        if ( url.searchParams.has("name") ){
          return atob( url.searchParams.get(param)).replace(/[\x3c\x3e\x27\x20]/g, "");
        }
        return false;
      }

      let e = document.createElement('p');
      var name = getParam();
      if (!name) return;
      let count = 200;
      let r = rand(Math.floor( count/2+count/4 ));
      e.id = "xss";
      document.body.append(e);
      for (let i=0; i<count; i++){
        if ( i == r )
          e.innerHTML = `<img alt="loading ${name} icon" src="icon.png"/>`;
        else
          e.innerHTML = getRandText();
      }
      e.remove();
    }
    xss();
