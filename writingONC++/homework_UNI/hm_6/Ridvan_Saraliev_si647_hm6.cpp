#include <iostream>
#include <cmath>

using namespace std;

	bool compare_less(int a, int b) {
	return  a < b;
    }
    bool compare_greater(int a, int b) {
  return  a > b;
    }
int optimum(int arr[], int n, bool (*fp)(int, int)){
	int result=arr[0];

	for (int i{ 1 }; i < n; i++) {
        if(fp(result,arr[i])==true)
        {
        	result=arr[i];
		}
     }
     return result;
}
int main(){
	const int size {4};
	int arr[size]{3,5,2,1};
	

	
	int resultMin = optimum(arr, size, compare_greater);
	int resultMax = optimum(arr,size,compare_less);
	cout<<resultMin<<endl;
	cout<<resultMax;
	return 0;
}
