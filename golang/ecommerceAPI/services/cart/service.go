package cart

import (
	"fmt"

	"ecommerceAPI/types"
)

func getCartItemsIDs(items []types.CartItem) ([]int, error) {
	pids := make([]int, len(items))
	for i, item := range items {
		if item.Quantity <= 0 {
			return nil, fmt.Errorf("invalid Qty. for pid:%d", item.ProductID)
		}
		pids[i] = item.ProductID
	}
	return pids, nil
}

func checkCartStock(cartItems []types.CartItem, products map[int]types.Product) error {
	if len(cartItems) == 0 {
		return fmt.Errorf("cart is empty")
	}
	for _, item := range cartItems {
		product, ok := products[item.ProductID]
		if !ok {
			return fmt.Errorf("product %d not available in store", item.ProductID)
		}
		if product.Quantity < item.Quantity {
			return fmt.Errorf("only %dx Qty. available in stock", product.Quantity)
		}
	}
	return nil
}

func calculateTotalPrice(cartItems []types.CartItem, products map[int]types.Product) float64 {
	var total float64
	for _, item := range cartItems {
		total += products[item.ProductID].Price * float64(item.Quantity)
	}
	return total
}

func (h *Handler) CreateOrder(
	ps []*types.Product, items []types.CartItem, userID int) (int, float64, error) {
	productMap := make(map[int]types.Product)
	for _, product := range ps {
		productMap[product.ID] = *product
	}
	if err := checkCartStock(items, productMap); err != nil {
		return 0, 0, nil
	}
	totalPrice := calculateTotalPrice(items, productMap)
	for _, item := range items {
		product := productMap[item.ProductID]
		product.Quantity -= item.Quantity
		h.productStore.UpdateProduct(product)
	}
	orderID, err := h.store.CreateOrder(types.Order{
		UserID:  userID,
		Total:   totalPrice,
		Status:  "pending",
		Address: "here",
	})
	if err != nil {
		return 0, 0, err
	}
	for _, item := range items {
		h.store.CreateOrderItem(types.OrderItem{
			OrderID:   orderID,
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     productMap[item.ProductID].Price,
		})
	}
	return orderID, totalPrice, nil
}
