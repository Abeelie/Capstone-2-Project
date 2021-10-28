import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || process.env.BASE_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

class AIStudyAPI {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${AIStudyAPI.token}` };
        const params = (method === "get") ? data : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }

    static async login(data) {
        let res = await this.request(`auth/login`, data, "post");
        return res.token;
      }
    
  
    static async signup(data) {
        let res = await this.request(`auth/sign-up`, data, "post");
        return res.token;
      }


    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
      }


    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }


    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, "delete");
        return res.status;
      }


    static async getFlashCards(tag) {
        let res = await this.request(`flashcards/${tag}`);
        return res.tag;
      }

    static async getUserFlashCards(username) {
        let res = await this.request(`flashcards/user/${username}`);
        return res.usercards;
      }

    static async createFlashCards(data) {
        let res = await this.request(`flashcards/create`, data, "post");
        return res.flashcards;
      }

    static async deleteFlashCards(flashcardtitle) {
       await this.request(`flashcards/delete/${flashcardtitle}`, {}, "delete");
      }


    static async getAllTodo(username) {
        let res = await this.request(`todo/${username}`);
        return res.todo;
      }


    static async createTodo(todo) {
        let res = await this.request(`todo/create`, todo, "post");
        return res.todo;
      }


    static async deleteTodo(todo) {
        let res = await this.request(`todo/delete/${todo}`, {}, "delete");
        return res.status;
      }
    
}


export {AIStudyAPI}