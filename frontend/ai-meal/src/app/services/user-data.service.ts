import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userInformation: any = {};
  setGoal(goal: string) {
    this.userInformation.goal = goal;
  }

  getGoal() {
    return this.userInformation.goal;
  }

  // Store data for each component
  setPage2Data(data: any) {
    this.userInformation.page2 = data;
  }

  setAgeData(data: any) {
    this.userInformation.age = data;
  }

  setWeightData(data: any) {
    this.userInformation.weight = data;
  }

  setHeightData(data: any) {
    this.userInformation.height = data;
  }

  setSexData(data: any) {
    this.userInformation.sex = data;
  }

  setHealthInfoData(data: any) {
    this.userInformation.healthInfo = data;
  }

  setFoodAllergiesData(data: any) {
    this.userInformation.foodAllergies = data;
  }

  // Get all collected data
  getAllData() {
    return this.userInformation;
  }

  // Clear data (optional)
  clearData() {
    this.userInformation = {};
  }}
