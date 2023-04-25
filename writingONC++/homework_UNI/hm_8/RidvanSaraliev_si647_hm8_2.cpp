#include <iostream>
using namespace std;
class rectAngle
{
    double width;
    double length;

public:
    rectAngle()
    {
        width = 5;
        length = 4;
    }
    rectAngle(double w)
    {
        width = length = w;
    }
    rectAngle(double w, double l)
    {
        width = w;
        length = l;
    }
    double get_width()
    {
        return width;
    }
    double get_length()
    {
        return length;
    }
    void set_width(double new_width)
    {
        width = new_width;
    }
    void set_length(double new_length)
    {
        length = new_length;
    }
    void show()
    {
        cout << "rectAngle width: " << width << "   rectAngle length: " << length << endl;
    }
    double area()
    {
        return width * length;
    }
    double perimeter()
    {
        return 2 * width + 2 * length;
    }
};

int main()
{
    rectAngle r1;
    rectAngle r2(5);
    rectAngle r3(10, 4);

    r1.show();
    cout << "**********************************" << endl;
    r2.show();
    cout << "**********************************" << endl;
    r3.show();
    cout << "**********************************" << endl;
    double r3Width = r3.get_width();
    double r3Length = r3.get_length();
    r3Width++;
    r3Length++;
    r3.set_length(r3Length);
    r3.set_width(r3Width);
    r3.show();
    cout << "rectAngle perimeter: " << r3.perimeter() << endl;
    cout << "rectAngle area: " << r3.area() << endl;
    cout << "**********************************" << endl;

    rectAngle r4;
    rectAngle r5(4);
    rectAngle r6(2, 3);
    rectAngle rectangles[3]{r4, r5, r6};
    for (int i = 0; i < 3; i++)
    {
        rectangles[i].show();
        cout << "rectAngle perimeter: " << rectangles[i].perimeter() << endl;
        cout << "rectAngle area: " << rectangles[i].area() << endl;
        cout << endl;
    }
}