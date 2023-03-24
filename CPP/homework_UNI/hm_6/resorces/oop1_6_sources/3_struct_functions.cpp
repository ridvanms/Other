#include <iostream>
#include <string>
using namespace std;

struct dish {
    string name;
    int grams;
    double price;
};

//1 - по стойност 
void show(dish d) {
    cout << d.name << ", " << d.grams << "gr, cena=" << d.price << "lv\n";
}
//2 - по референци€
void input(dish& d) {
    cout << "Ime?"; cin >> d.name;
    cout << "Gramaz?"; cin >> d.grams;
    cout << "Cena?"; cin >> d.price;
}
//3. ћасив - предава се по механизма на указателите
void show(dish list[], int count) {
    for (int i{ 0 }; i < count; i++) {
        cout << list[i].name << ", gramaz=" << list[i].grams
            << ", cena=" << list[i].price << "lv\n";
    }
}



int main()
{
    dish d1;
    //input(d1);
    dish* d2 = new dish;
   // input(*d2);

    dish d3{ "kafe", 100, 1.2 };
    cout << "Promenlivi dish\n";
    show(d1);
    show(*d2);
    show(d3);

    //Masiv dish
    dish my[3]{
        {"sandwitch", 150, 2.5},
        {"kafe", 100, 2.2},
        {"water", 500, 1.3}
    };

    show(my, 3);
    double s{ 0 };
    for (auto d : my) {
        s += d.price;
    }
    cout << "Total price:" << s << endl;


    return 0;
}