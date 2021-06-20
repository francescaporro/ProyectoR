const URL_API  = 'https://randomuser.me/api/?results=20';

class Api{

	async getFichas(){
		const time = new Date().getTime();
		const query = await fetch(URL_API);
		let data = await query.json();
        //console.log(data["results"])  
		return data["results"]
	}

	

}

export default new Api();