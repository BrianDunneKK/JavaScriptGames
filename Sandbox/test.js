import { greeting } from './test_module.js'

let elem = document.getElementById('idTest');
elem.innerHTML = greeting();
