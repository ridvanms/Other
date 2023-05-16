#include <iostream>
#include <cstdlib>
#include <cstring>

int main()
{

    std::string food = "Pizza";
    std::cout<<food<<std::endl;

    std::string* ptr = &food;

    std::cout<<ptr<<std::endl;

    return EXIT_SUCCESS;
}
