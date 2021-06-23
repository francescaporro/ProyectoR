const URL_API  = 'https://randomuser.me/api/?results=';

class Api{

	async getFichas(registros){
		const time = new Date().getTime();
		const query = await fetch(URL_API+registros);
		let data = await query.json();
        //console.log(data["results"])  
		return data["results"]
	}

	

}

export default new Api();