#include <iostream>
#include <cstdlib>

using namespace std;

int main(){
    system("chcp 1251 > null");
    int num,k;
    
    for(k=1;k<=5;k++){
        cout<<"Some number from 1 to 3: ";
        cin>>num;

        if(num==1){
            cout<<"that was 1"<<endl;
        }else{
            if(num==2){
                cout<<"this is 2"<<endl;
            }else{
                if(num==3){
                    cout<<"This is 3"<<endl;
                }else{
                    cout<<"I don't know this number"<<endl;
                }
            }
        }
    };
    system("pause>nul");
    return 0;
}