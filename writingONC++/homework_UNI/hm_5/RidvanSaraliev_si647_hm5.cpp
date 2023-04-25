#include <iostream>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include<array>

using namespace std;


//double  mult1 (int arr1[],double arr2[]){
//	int arrLength = *(&arr1 + 1) - arr1;
//	double therdArr[arrLength];
//	for(int i =0;i<arrLength;i++){
//		therdArr[i] = arr1[i] * arr2[i];
//	}	
//	return therdArr[arrLength];
//} 

  
//double createArr(int length,double m){
//	double arr[length];
//	for(int i=0;i<length;i++){
//		arr[i] = (i+1) * m;
//	}
//	return arr[length];
//}
////////////////////////

double squareRoom(double width,double length){
return width * length;
};


int main(){
//	int masiveLength;
//	cout<<"Enter the massive length";cin>>masiveLength;
	//creating arr
//	int wholeArr = createArr(masiveLength,1);
//	double realArr = createArr(masiveLength,0.1);
//	
//	double therdArray = mult1(wholeArr, realArr);
//	cout<<therdArray[];
	///////////////////
//	4.	Напишете функция, която изчислява лицето на  основата  
//	на стая (квадратурата й). 
//	За двата размера на стаята задайте подразбиращи се 
//	стойности на аргументите. Покажете всички възможни 
//	повиквания на функцията

	double width;
	double length;
	cout<<"room square calculator"<<endl;
	cout<<"add the width of the room: ";cin>>width;
	cout<<"add the length of the room: ";cin>>length;
	
	cout<<"the result is: "<<squareRoom(width,length);
	system("pause>0");
	return 0;
};
