#include <iostream>
#include <string>
using namespace std;
class circle
{
private:
    static constexpr double PI{3.14159265};
    double radius;

public:
    circle()
    {
        radius = 1;
    }
    circle(double r)
    {
        radius = r;
    }
    double get_radius() { return radius; }
    circle &set_radius(double r)
    {
        this->radius = r;
        return *this;
    }
    string toString()
    {
        return "Circle radius is " + to_string(radius);
    }
    double area()
    {
        return PI * radius * radius;
    }
    double perim()
    {
        return 2 * PI * radius;
    }
};
int main()
{
    circle c1;
    c1.set_radius(4);
    cout << c1.toString() << endl;
    cout << "Circle area is " << c1.area() << endl;
    cout << "Circle perimeter is " << c1.perim() << endl;
    cout << "*************************" << endl;
    circle c2(6);
    cout << c2.toString() << endl;
    cout << "Circle area is " << c2.area() << endl;
    cout << "Circle perimeter is " << c2.perim() << endl;
    cout << "*************************" << endl;
    c2.set_radius(c2.get_radius() * 1.5);
    cout << c2.toString() << endl;
    cout << "Circle area is " << c2.area() << endl;
    cout << "Circle perimeter is " << c2.perim() << endl;
    cout << "*************************" << endl;
    circle *c3 = new circle();
    c3->set_radius(8);
    cout << c3->toString() << endl;
    cout << "Circle area is " << c3->area() << endl;
    cout << "Circle perimeter is " << c3->perim() << endl;
    cout << "*************************" << endl;
    circle *c4 = new circle(2);
    cout << c4->toString() << endl;
    cout << "Circle area is " << c4->area() << endl;
    cout << "Circle perimeter is " << c4->perim() << endl;
    cout << "*************************" << endl;
    cout << "----------Array----------" << endl;
    circle circles[4] =
        {
            {4.5},
            {1.5},
            {1.3},
            {3.1}};
    for (circle el : circles)
    {
        cout << el.toString() << endl;
        cout << "Circle area is " << el.area() << endl;
        cout << "Circle perimeter is " << el.perim() << endl;
        cout << "*************************" << endl;
    }
    for (circle &el : circles)
    {
        el.set_radius(el.get_radius() + 1);
    }
    cout << "----------Array----------" << endl;
    for (circle el : circles)
    {
        cout << el.toString() << endl;
        cout << "Circle area is " << el.area() << endl;
        cout << "Circle perimeter is " << el.perim() << endl;
        cout << "*************************" << endl;
    }
    circle *circles2 = new circle[4]{
        {1},
        {2},
        {3},
        {4}};
    cout << "----------Array----------" << endl;
    for (int i = 0; i < 4; i++)
    {
        cout << circles2[i].toString() << endl;
        cout << "Circle area is " << circles2[i].area() << endl;
        cout << "Circle perimeter is " << circles2[i].perim() << endl;
        cout << "*************************" << endl;
    }
    delete[] circles2;
    delete c3;
    delete c4;
}