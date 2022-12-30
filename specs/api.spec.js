import axios from "axios";
import { jest } from "@jest/globals"; 
//import { waitFor } from "test/test-utils";
import expect from "expect"; jest;


test('1 POST craete user', async ()=>{
	const config = {
		method: 'post',
		url: 'https://bookstore.demoqa.com/Account/v1/User'	,
		data: {
			"userName": "test userName7",
			"password": "123test%String"
		},
		headers: { },
	};
	const resp = await axios(config);
	//console.log(resp);
	expect(resp.status).toEqual(201);
	expect(resp.data.username).toEqual("test userName7");
});


test('2 POST craete user: duplicate login', async ()=>{      
	const config = {
		method: 'post',
		url: 'https://bookstore.demoqa.com/Account/v1/User'	,
		data: {
			"userName": "test userName7",
			"password": "123test%String321"
		},
		headers: { },
	};
	try {
		const resp = await axios(config);	
		//console.log(resp)		
	}
	catch (e) {
		//console.log(e)
		expect(e.response.status).toEqual(406) 
	}
});

test('3 POST craete user: wrong password', async ()=>{      
	const config = {
		method: 'post',
		url: 'https://bookstore.demoqa.com/Account/v1/User'	,
		data: {
			"userName": "test userName51",
			"password": "test string"
		},
		headers: { },
	};
	try {
		const resp = await axios(config);	
		//console.log(resp)		
	}
	catch (e) {
		console.log(e)
		expect(e.response.status).toEqual(400) 
		expect(e.response.data.code).toEqual('1300')
	}
});

test('4 POST craete token', async ()=>{      
	const config = {
		method: 'post',
		url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken'	,
		data: {
			"userName": "test userName7",
			"password": "123test%String"
		},
		headers: { },
	};
	const resp = await axios(config);
	//console.log(resp);
	expect(resp.status).toEqual(200);
	expect(resp.data.status).toEqual('Success');
});

test('5 POST craete token whith error: unreg user', async ()=>{      
	const config = {
		method: 'post',
		url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken'	,
		data: {
			"userName": "test userName5ddddd",   
			"password": "123test%String"
		},
		headers: { },
	};
	const resp = await axios(config);
	//console.log(resp);
	expect(resp.data.status).toEqual('Failed')
});






//-------ClassWork----------------------------------------------------------------------------------------------------------------------------------------------------------
test.skip('GET request status', async ()=>{
	const config = {
		method: 'get',
		url: 'https://dummyjson.com/products/1'		
	};
	const resp = await axios(config);
	//console.log(resp.data);
	expect(resp.status).toEqual(200);
});

test.skip('GET request data.title', async ()=>{   //пропускаем тест
	const config = {
		method: 'get',
		url: 'https://dummyjson.com/products/1'		
	};
	const resp = await axios(config);
	//console.log(resp.data);
	console.log(typeof (resp.data));  //узнать тип
	expect(resp.data.title).toEqual('iPhone 9');
});

test.skip('POST request', async ()=>{      //skip - пропустить тест
//test('POST request', async ()=>{
	const config = {
		method: 'post',
		url: 'https://dummyjson.com/products/add'	,
		data: {
			title: "test new car 999",
			price: 987
		},
		headers: { },
	};
	const resp = await axios(config);
	console.log(resp.data);
	//console.log(typeof (resp.data));  //узнать тип
	expect(resp.status).toEqual(200);
	expect(resp.data.title).toEqual('test new car 999');
	expect(resp.data).toEqual({ id: 101, title: 'test new car 999', price: 987 });
});

//try-catch  для отлова ошибок
test.skip('GET request try-catch', async ()=>{   //пропускаем тест
	const config = {
		method: 'get',
		url: 'https://dummyjson.com/product656756486548645s/1'
	}
	try {
		const resp = await axios(config);
	}
	catch (e) {
		console.log(e)
	}
	const resp = await axios(config);
	//console.log(resp.data);
	//console.log(typeof (resp.data));  //узнать тип
	expect(resp.data.title).toEqual('iPhone 9');
});

//try-catch  для отлова ОЖИДАЕМЫХ ошибок
test.skip('GET request error status', async ()=>{   //пропускаем тест
	const config = {
		method: 'get',
		url: 'https://dummyjson.com/auth/products'
	}
	try {
		const resp = await axios(config);		
		expect(resp.status).toEqual(403)    						//ожидаем что ошибка авторизации (простейший вариант)
	}
	catch (e) {
		console.log(e)
		expect(e.response.status).toEqual(403)    						//а можно так. ожидаем что ошибка авторизации. лкчше так, потому что будем рработать с аксиос эррор
	}
	//const resp = await axios(config);
	//console.log(resp.data);
	//console.log(typeof (resp.data));  //узнать тип
	//expect(resp.data.title).toEqual('iPhone 9');
});

//авторизация
test.skip('post auth', async ()=>{
	const config = {
		method: 'post',
		url: 'https://dummyjson.com/auth/login'	,
		data: {
			username: "kminchelle",
			password: "0lelplR"
		},
		headers: { },
	};
	const resp = await axios(config);
	console.log(resp.data);
	const resp_prod = await axios({
		method: 'get',
		url: 'https://dummyjson.com/auth/products/1',
		headers: { 
			'Authorization':`Bearer ${resp.data.token}`
		},
	});
	expect(resp_prod.status).toEqual(200);
	//console.log(typeof (resp.data));  //узнать тип
	//expect(resp.status).toEqual(200);
	//expect(resp.data.title).toEqual('test new car 999');
	//expect(resp.data).toEqual({ id: 101, title: 'test new car 999', price: 987 });
});

//авторизация и URL с параметром
test.skip('post auth', async ()=>{
	const config = {
		method: 'post',
		url: 'https://dummyjson.com/auth/login'	,
		data: {
			username: "kminchelle",
			password: "0lelplR"
		},
		headers: { },
	};
	const resp = await axios(config);
	console.log(resp.data);
	const pathParam = 'products'					//вводим параметр
	const resp_prod = await axios({
		method: 'get',
		url: `https://dummyjson.com/auth/${pathParam}/1`,			//тут
		headers: { 
			'Authorization':`Bearer ${resp.data.token}`
		},
	});
	console.log(resp_prod.data);
//	const jsonData = formToJSON(resp_prod.data)     	//тут должно сохраняться в json но не сохраняется
	const jsonData = JSON.stringify(resp_prod.data)    //тут стринга сохраняется
	console.log(jsonData);
	expect(resp_prod.status).toEqual(200);
	//console.log(typeof (resp.data));  //узнать тип
	//expect(resp.status).toEqual(200);
	//expect(resp.data.title).toEqual('test new car 999');
	//expect(resp.data).toEqual({ id: 101, title: 'test new car 999', price: 987 });
});