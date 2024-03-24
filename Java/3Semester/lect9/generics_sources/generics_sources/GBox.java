package lect9;

public class GBox<T> {
	private T item;

	public GBox(T item) {
		super();
		this.item = item;
	}

	public GBox() {}

	public T getItem() {
		return item;
	}

	public void setItem(T item) {
		this.item = item;
	}

	@Override
	public String toString() {
		return "GBox [item=" + item + "]";
	}
}
