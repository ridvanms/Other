#include <iostream>
#include <cstdlib>
#include <cstring>

template<typename T>
class Account
{
    T id;
public:
    Account() = default;
    Account(T _id):id(_id){};
    T getId()
    {
        return id;
    }
};

int main(){

    Account<int>acc1(1231230);
    Account<std::string>acc2("1298389");

    std::cout<<acc1.getId()<<std::endl;
    std::cout<<acc2.getId()<<std::endl;

    return EXIT_SUCCESS;
}
