#include <iostream>
#include <cstdlib>
#include <algorithm>
#include <string>
#include <new>

void reverseValues(int &x,int &y){
    int z = x;
    x = y;
    y = z;
}

//Recursion Example
int sum(int k){
    if(k > 0){
        return k + sum(k - 1);
    }else{
    return 0;
    }
}

//Polymorphism
class Animal{
public:
    void animalSound()
    {
        std::cout<<"The animal makes a sound\n";
    }
};
class Pig : public Animal{
public:
    void animalSound()
    {
        std::cout<<"The pig says we weweee\n";
    }
};
class Dog : public Animal{
public:
    void animalSound()
    {
        std::cout<<"The Dog says bow bow \n";
    }
};

int main()
{
    char arr[] = {'a','b','c','d','e'};

    //Getting array size
    std::cout<<"Elements in the arr Array : "<<sizeof(arr) / sizeof(char) <<std::endl;

    //Looping through Array
    for(char arrEl:arr){
        std::cout<<"Element of the elements in the arr: "<<arrEl<<std::endl;
    }
    //Creating references
    std::string food = "pizza";
    std::string &meal = food;

    std::cout<<"&meal "<< &meal <<std::endl;

    //Pointers
    std::string fruid = "apple";
    std::string* fruidPointer = &fruid;

    std::cout<<"&fruid = "<<&fruid<<std::endl;
    std::cout<<"fruidPointer = "<< fruidPointer <<std::endl;
    std::cout<<"*fruidPointer = "<< *fruidPointer <<std::endl;

    //Dynamic memory...Operators new and delete
    int i,sizeOfarray;
    int* p;
    std::cout<<"How many numbers would you type? "<<std::endl;
    std::cin>> i;
    p = new (std::nothrow) int[i];

    for(int n = 0;n<i;n++){
        std::cout<<"Enter number: ";
        std::cin>> p[n];
    }
    std::cout<<"You have entered: ";
    for(int n = 0;n<i;n++){
        std::cout<< p[n]<<", ";
    }
    delete[] p;
    std::cout<<std::endl;

    // Using functions
//    void functionName(parameter1, parameter2, parameter3) {
//      // code to be executed
//    }
    int x = 10;
    int y =20;
    std::cout<<"Before reverse: "<<"x = "<<x<<" y = "<<y<<std::endl;

    reverseValues(x,y);

    std::cout<<"After reverse: "<<"x = "<<x<<" y = "<<y<<std::endl;


    int choosenNumber;
    std::cout<<"Enter number to see the summing of all numbers to the number: ";
    std::cin>>choosenNumber;
    std::cout<<"Result is: "<<sum(choosenNumber)<<std::endl;

    //Polymorphism
    Animal animal;
    Dog myDog;
    Pig myPig;

    animal.animalSound();
    myPig.animalSound();
    myDog.animalSound();

    std::cout<<std::endl;


    return EXIT_SUCCESS;
}
