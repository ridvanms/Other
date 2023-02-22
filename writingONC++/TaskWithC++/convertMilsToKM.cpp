#include <iostream>
#include <cstdlib>

using namespace std;
int main(){
    const double kmInMile = 1.609344;
    double distMile,distKm;
    cout<<"Add distance in miles: ";cin>>distMile;
    distKm = distMile * kmInMile;
    cout<<"Distance in (KM): "<<distKm<<endl;
    system("pause>null");
    return 0;
}