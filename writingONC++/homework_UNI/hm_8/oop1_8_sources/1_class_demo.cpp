#include <iostream>
#include <string>
using namespace std;

//��������� �� �����
class car {
    //�� ������������ �������� � private
    string model; 
    int speed; 
    int max_speed; 
public: // ��������� �� �����
    void set(string _model, int _speed, int _max_speed) {
        model = _model;
        speed = _speed;
        max_speed = _max_speed;
    }
    void run() {
        if (speed > 0)
            cout << model << " �� ����� ��� ������� " << speed << " ��/�\n";
        else cout << model << " ����\n";
    }
    void stop() {
        speed = 0;
    }
    void accelerate(int by_speed) {
        int new_speed = speed + by_speed;
        if (new_speed <= max_speed) speed = new_speed;
        else speed = max_speed;
    }
};

int main1()
{
    system("chcp 1251>nul");
    //��������� �� ������ �� ������� ���� 
    //����� ����� ������� ��������� ����� �� ����-�������
    //����-��������� �� ���������� � ��������� ���������
    // � �� ������� �� ������ ������

    car c1; //�������� �� ������������ �� ������������, �������� �� �����������
    car c2;
    cout << sizeof c1 << " " << sizeof c2 << endl;
    //>= string + int + int -> 40+4+ 4
   // cout << sizeof (string) << endl; //40

    //��������� �� public ����� �����.�����(���������)

    c1.set("����", 120, 250);
    c2.set("��������", 140, 260);
    c1.run();
    c2.run();

    c1.accelerate(40);
    c2.stop();

    c1.run();
    c2.run();

    //����� � �����
    car* c3 = new car();
    c3->set("����", 100, 300);
    c3->run(); //(*c3).run();

    delete c3;

    /*car c4;
    c4.run();*/

    return 0;
}